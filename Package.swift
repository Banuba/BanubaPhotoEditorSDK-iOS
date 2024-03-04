// swift-tools-version:5.3
import PackageDescription

let package = Package(
  name: "BanubaPhotoEditorSDK",
  platforms: [
    .iOS(.v12)
  ],
  products: [
    .library(
      name: "BanubaPhotoEditorSDK",
      targets: ["BanubaPhotoEditorSDK"])
  ],
  dependencies: [
    .package(url: "https://github.com/sdk-banuba/BNBSdkCore.git", from: "1.10.1"),
    .package(url: "https://github.com/sdk-banuba/BNBSdkApi.git", from: "1.10.1"),
    .package(url: "https://github.com/sdk-banuba/BNBEffectPlayer.git", from: "1.10.1"),
    .package(url: "https://github.com/sdk-banuba/BNBScripting.git", from: "1.10.1"),
    .package(url: "https://github.com/sdk-banuba/BNBLips.git", from: "1.10.1"),
    .package(url: "https://github.com/sdk-banuba/BNBHair.git", from: "1.10.1"),
    .package(url: "https://github.com/sdk-banuba/BNBEyes.git", from: "1.10.1"),
    .package(url: "https://github.com/sdk-banuba/BNBBackground.git", from: "1.10.1"),
    .package(url: "https://github.com/sdk-banuba/BNBSkin.git", from: "1.10.1"),
    .package(url: "https://github.com/sdk-banuba/BNBAcneEyebagsRemoval.git", from: "1.10.1"),
    .package(url: "https://github.com/Banuba/BanubaUtilities-iOS.git", from: "1.33.0"),
    .package(url: "https://github.com/Banuba/BanubaLicenseServicingSDK.git", from: "1.33.0"),
    .package(url: "https://github.com/Banuba/BNBLicenseUtils-iOS.git", from: "1.33.0")
  ],
  targets: [
    .binaryTarget(
      name: "BanubaPhotoEditorSDK",
      path: "BanubaPhotoEditorSDK.xcframework"
    )
  ]
)
