// swift-tools-version:5.9

import PackageDescription

//let faceARversionRange: Range<Version> = "1.16.0"..<"1.16.1"
let faceARversionRange: Version = "1.16.0"
let videoEditorSDKRange: Range<Version> = "1.38.0"..<"1.39.7"

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
    .package(url: "https://github.com/sdk-banuba/BNBSdkCore.git", exact: faceARversionRange),
    .package(url: "https://github.com/sdk-banuba/BNBSdkApi.git", exact: faceARversionRange),
    .package(url: "https://github.com/sdk-banuba/BNBEffectPlayer.git", exact: faceARversionRange),
    .package(url: "https://github.com/sdk-banuba/BNBScripting.git", exact: faceARversionRange),
    .package(url: "https://github.com/sdk-banuba/BNBLips.git", exact: faceARversionRange),
    .package(url: "https://github.com/sdk-banuba/BNBHair.git", exact: faceARversionRange),
    .package(url: "https://github.com/sdk-banuba/BNBEyes.git", exact: faceARversionRange),
    .package(url: "https://github.com/sdk-banuba/BNBBackground.git", exact: faceARversionRange),
    .package(url: "https://github.com/sdk-banuba/BNBSkin.git", exact: faceARversionRange),
    .package(url: "https://github.com/sdk-banuba/BNBAcneEyebagsRemoval.git", exact: faceARversionRange),
    
    .package(url: "https://github.com/Banuba/BanubaUtilities-iOS.git", videoEditorSDKRange),
    .package(url: "https://github.com/Banuba/BanubaLicenseServicingSDK.git", videoEditorSDKRange),
    .package(url: "https://github.com/Banuba/BNBLicenseUtils-iOS.git", videoEditorSDKRange)
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
