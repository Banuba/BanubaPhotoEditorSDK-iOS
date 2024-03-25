// swift-tools-version:5.9

import PackageDescription

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
    .package(url: "https://github.com/sdk-banuba/BNBSdkCore.git", .exact("1.11.1")),
    .package(url: "https://github.com/sdk-banuba/BNBSdkApi.git", .exact("1.11.1")),
    .package(url: "https://github.com/sdk-banuba/BNBEffectPlayer.git", .exact("1.11.1")),
    .package(url: "https://github.com/sdk-banuba/BNBScripting.git", .exact("1.11.1")),
    .package(url: "https://github.com/sdk-banuba/BNBLips.git", .exact("1.11.1")),
    .package(url: "https://github.com/sdk-banuba/BNBHair.git", .exact("1.11.1")),
    .package(url: "https://github.com/sdk-banuba/BNBEyes.git", .exact("1.11.1")),
    .package(url: "https://github.com/sdk-banuba/BNBBackground.git", .exact("1.11.1")),
    .package(url: "https://github.com/sdk-banuba/BNBSkin.git", .exact("1.11.1")),
    .package(url: "https://github.com/sdk-banuba/BNBAcneEyebagsRemoval.git", .exact("1.11.1")),
    .package(url: "https://github.com/Banuba/BanubaUtilities-iOS.git", from: "1.35.0"),
    .package(url: "https://github.com/Banuba/BanubaLicenseServicingSDK.git", from: "1.35.0"),
    .package(url: "https://github.com/Banuba/BNBLicenseUtils-iOS.git", from: "1.35.0")
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
        "BNBAcneEyebagsRemoval",
        "BanubaLicenseServicingSDK",
        .product(name: "BanubaUtilities", package: "BanubaUtilities-iOS"),
        .product(name: "BNBLicenseUtils", package: "BNBLicenseUtils-iOS")
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
    .binaryTarget(
      name: "BanubaPhotoEditorSDK",
      path: "BanubaPhotoEditorSDK.xcframework"
    )
  ]
)
