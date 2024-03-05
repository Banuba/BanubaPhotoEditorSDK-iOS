// swift-tools-version:5.3
import PackageDescription

let package = Package(
  name: "BanubaPhotoEditorSDK",
  platforms: [
    .iOS(.v14)
  ],
  products: [
    .library(
      name: "BanubaPhotoEditorSDK",
      targets: ["BanubaPhotoEditorSDK"])
  ],
  dependencies: [
    .package(url: "https://github.com/sdk-banuba/BNBSdkCore.git", .exact("1.10.1")),
    .package(url: "https://github.com/sdk-banuba/BNBSdkApi.git", .exact("1.10.1")),
    .package(url: "https://github.com/sdk-banuba/BNBEffectPlayer.git", .exact("1.10.1")),
    .package(url: "https://github.com/sdk-banuba/BNBScripting.git", .exact("1.10.1")),
    .package(url: "https://github.com/sdk-banuba/BNBLips.git", .exact("1.10.1")),
    .package(url: "https://github.com/sdk-banuba/BNBHair.git", .exact("1.10.1")),
    .package(url: "https://github.com/sdk-banuba/BNBEyes.git", .exact("1.10.1")),
    .package(url: "https://github.com/sdk-banuba/BNBBackground.git", .exact("1.10.1")),
    .package(url: "https://github.com/sdk-banuba/BNBSkin.git", .exact("1.10.1")),
    .package(url: "https://github.com/sdk-banuba/BNBAcneEyebagsRemoval.git", .exact("1.10.1")),
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
