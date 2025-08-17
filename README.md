# GymFit

GymFit is a mobile workout companion that offers structured routines for three experience levels:

1. **Beginner** – foundational body-weight movements.
2. **Intermediate** – classic barbell lifts for strength.
3. **Advanced** – heavy compound & weighted calisthenics.

For every exercise you will find:

* High-resolution photo that demonstrates correct form.
* Concise how-to description.
* Sets / repetitions guidance.
* Rest-time recommendations (between sets & after exercise).

## Preview

<p align="center">
  <img src="https://i.imgur.com/4ZQ2vXQ.png" width="180" />
  <img src="https://i.imgur.com/Nzb8gWJ.png" width="180" />
</p>

---

## Getting started

1. **Install Flutter** – v3.10+ is recommended.
2. **Clone repository**

```bash
git clone https://github.com/your-name/gymfit.git
cd gymfit
flutter pub get
```

3. **Run** on a simulator / device:

```bash
flutter run
```

## Building release artifacts

Generate an APK & AAB:

```bash
flutter build apk --release
flutter build appbundle --release
```

After running, you will find:
* `build/app/outputs/flutter-apk/app-release.apk`
* `build/app/outputs/bundle/release/app-release.aab`

The **AAB** file is the package required for uploading to Google Play Console.

## GitHub Actions CI

Every push to `main` triggers the **Flutter CI** workflow located in `.github/workflows/flutter.yml`, which:

1. Sets up the Flutter SDK.
2. Retrieves packages & analyzes code.
3. Builds the debug APK (proof of successful compilation).

## Google Play publication checklist

1. Prepare store graphics (icon, screenshots).
2. Sign the AAB with your upload key `key.jks` (update `key.properties`).
3. Complete Play Console listing (privacy, content rating, description, etc.).
4. Upload `app-release.aab` to **Production** or **Closed testing**.

Refer to the official [Play Console docs](https://developer.android.com/studio/publish) for details.