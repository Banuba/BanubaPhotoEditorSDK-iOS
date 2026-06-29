// swift-tools-version:5.9

import PackageDescription

let faceARversionRange: Range<Version> = "1.17.5-beta.0"..<"1.17.99"
let designSystemVersionRange: Range<Version> = "1.0.0-beta.0"..<"2.0.0"
let banubaUtilsVersionRange: Range<Version> = "1.53.0-beta.0"..<"1.60.99"
let banubaLicenseServicingVersionRange: Range<Version> = "1.53.0-beta.0"..<"1.60.99"

let package = Package(
  name: "BanubaPhotoEditorSDK",
  platforms: [
    .iOS(.v15)
  ],
  products: [
    .library(
      name: "BanubaPhotoEditorSDK",
      targets: ["BanubaPhotoEditorSDKTarget"]
    )
  ],
  dependencies: [
    .package(url: "https://github.com/sdk-banuba/BNBSdkCore.git", faceARversionRange),
    .package(url: "https://github.com/sdk-banuba/BNBSdkApi.git", faceARversionRange),
    .package(url: "https://github.com/sdk-banuba/BNBEffectPlayer.git", faceARversionRange),
    .package(url: "https://github.com/sdk-banuba/BNBScripting.git", faceARversionRange),
    .package(url: "https://github.com/sdk-banuba/BNBLips.git", faceARversionRange),
    .package(url: "https://github.com/sdk-banuba/BNBHair.git", faceARversionRange),
    .package(url: "https://github.com/sdk-banuba/BNBEyes.git", faceARversionRange),
    .package(url: "https://github.com/sdk-banuba/BNBBackground.git", faceARversionRange),
    .package(url: "https://github.com/sdk-banuba/BNBSkin.git", faceARversionRange),
    .package(url: "https://github.com/sdk-banuba/BNBMakeup.git", faceARversionRange),
    
    .package(url: "https://github.com/Banuba/BanubaDesignSystem.git", designSystemVersionRange),
    .package(url: "https://github.com/Banuba/BanubaUtilities-iOS.git", banubaUtilsVersionRange),
    .package(url: "https://github.com/Banuba/BanubaLicenseServicingSDK.git", banubaLicenseServicingVersionRange),
  ],
  targets: [
    .target(
      name: "BanubaPhotoEditorSDKWrapper",
      dependencies: [
        "BanubaPhotoEditorSDK",
        "BNBSdkCore",
        "BNBSdkApi",
        "BNBEffectPlayer",
        "BNBScripting",
        "BNBLips",
        "BNBHair",
        "BNBEyes",
        "BNBBackground",
        "BNBSkin",
        "BNBMakeup",
        .product(name: "BanubaDesignSystem", package: "BanubaDesignSystem"),
        "BanubaLicenseServicingSDK",
        .product(name: "BanubaUtilities", package: "BanubaUtilities-iOS")
      ],
      path: "BanubaPhotoEditorSDKWrapper"
    ),
    .target(
      name: "BanubaPhotoEditorSDKTarget",
      dependencies: [
        .target(name: "BanubaPhotoEditorSDKWrapper")
      ],
      path: "BanubaPhotoEditorSDKTarget"
    ),
    // Local development uses the path-based binaryTarget below.
    // Release flow (fastlane patch_package_swift_for_nexus) replaces it in the GitHub distribution repo with:
    // .binaryTarget(
    //   name: "BanubaPhotoEditorSDK",
    //   url: "https://nexus.banuba.net/repository/ios-frameworks/ios/frameworks/BanubaPhotoEditorSDK/{version}/BanubaPhotoEditorSDK-{version}.xcframework.zip",
    //   checksum: "{computed at release}"
    // )
    .binaryTarget(
      name: "BanubaPhotoEditorSDK",
      url: "https://nexus.banuba.net/repository/ios-frameworks/ios/frameworks/BanubaPhotoEditorSDK/1.4.0/BanubaPhotoEditorSDK-1.4.0.xcframework.zip",
      checksum: "9396786b35779b89e8ba9b4d5dda6977f5d68c8719a781f50efd3f468031ac8a"
    )
  ]
)
