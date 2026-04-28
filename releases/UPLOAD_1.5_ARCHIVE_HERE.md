# Upload Asgard TV 1.5 archive here

ChatGPT has prepared the repository README, release notes, test report and GitHub Actions workflow.

To complete the first full source upload, add this file to the `releases/` folder:

```text
asgard-tv-1.5-release.zip.base64
```

The workflow `.github/workflows/build-apk-from-archive.yml` expects this path:

```text
releases/asgard-tv-1.5-release.zip.base64
```

How to create it locally on macOS/Linux:

```bash
base64 -w 0 asgard-tv-1.5-release.zip > asgard-tv-1.5-release.zip.base64
```

On macOS, if `-w` is not supported:

```bash
base64 asgard-tv-1.5-release.zip | tr -d '\n' > asgard-tv-1.5-release.zip.base64
```

After uploading the `.base64` file, run GitHub Actions to build the APK.
