#!/usr/bin/env bash
set -Eeuo pipefail

ARTIFACTS_DIR="${SMOKE_ARTIFACTS_DIR:-${GITHUB_WORKSPACE:-$(pwd)}/smoke-artifacts}"
APK_PATH="${GITHUB_WORKSPACE}/android/app/build/outputs/apk/debug/app-debug.apk"
PACKAGE_NAME="com.asgard.tv"

mkdir -p "$ARTIFACTS_DIR"

log() {
  echo "[$(date -u +'%Y-%m-%dT%H:%M:%SZ')] $*" | tee -a "$ARTIFACTS_DIR/smoke.log"
}

fail() {
  log "FAIL: $*"
  echo "$*" > "$ARTIFACTS_DIR/failure.txt"
  exit 1
}

on_error() {
  local rc="$1"
  local line="$2"
  echo "Smoke script failed at line ${line} with exit code ${rc}" > "$ARTIFACTS_DIR/failure.txt"
  exit "$rc"
}

trap 'on_error $? $LINENO' ERR

log "Emulator smoke script started"
log "Artifacts dir: $ARTIFACTS_DIR"
log "APK path: $APK_PATH"

if [[ ! -f "$APK_PATH" ]]; then
  fail "APK not found at $APK_PATH"
fi

adb devices | tee "$ARTIFACTS_DIR/adb-devices.txt"

adb shell input keyevent 82 || true

log "Installing APK"
adb install -r "$APK_PATH" | tee "$ARTIFACTS_DIR/adb-install.txt"

log "Clearing logcat"
adb logcat -c

log "Launching $PACKAGE_NAME"
adb shell monkey -p "$PACKAGE_NAME" -c android.intent.category.LAUNCHER 1 | tee "$ARTIFACTS_DIR/monkey-launch.txt"

log "Waiting for startup"
sleep 15

log "Collecting activity dump"
adb shell dumpsys activity activities | tee "$ARTIFACTS_DIR/activity.txt"

log "Collecting logcat"
adb logcat -d | tee "$ARTIFACTS_DIR/logcat.txt"

log "Capturing screenshot"
adb exec-out screencap -p > "$ARTIFACTS_DIR/launch.png" || true

if ! grep -q "$PACKAGE_NAME" "$ARTIFACTS_DIR/activity.txt"; then
  fail "Asgard TV package was not found in active activities"
fi

if grep -E "FATAL EXCEPTION|Application Not Responding|ANR in ${PACKAGE_NAME}|Process: ${PACKAGE_NAME}" "$ARTIFACTS_DIR/logcat.txt"; then
  fail "Crash or ANR found in logcat"
fi

log "Smoke test passed: APK installed, app launched, no crash/ANR detected."
echo "Smoke test passed" > "$ARTIFACTS_DIR/success.txt"
