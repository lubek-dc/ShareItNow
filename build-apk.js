const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Building APK for ShareItNow...');

// First build the web app
exec('npm run build', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error building web app: ${error}`);
    return;
  }
  
  console.log('Web app built successfully');
  console.log(stdout);
  
  // Copy web assets to Android
  exec('npx cap copy android', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error copying to Android: ${error}`);
      return;
    }
    
    console.log('Assets copied to Android successfully');
    console.log(stdout);
    
    // Check if we're in a WebContainer environment
    console.log('Note: In a WebContainer environment, we cannot directly build the APK.');
    console.log('The Android project has been set up in the "android" directory.');
    console.log('In a real environment, you would run:');
    console.log('cd android && ./gradlew assembleDebug');
    console.log('The APK would then be available at: android/app/build/outputs/apk/debug/app-debug.apk');
    
    // Create a mock APK file to demonstrate the process
    const mockApkDir = path.join(process.cwd(), 'mock-apk');
    if (!fs.existsSync(mockApkDir)) {
      fs.mkdirSync(mockApkDir);
    }
    
    fs.writeFileSync(
      path.join(mockApkDir, 'ShareItNow.apk.txt'),
      'This is a placeholder for the APK file.\n\nIn a real environment, you would build the APK using Android Studio or Gradle.\n'
    );
    
    console.log('\nA mock APK placeholder has been created at: mock-apk/ShareItNow.apk.txt');
    console.log('\nTo build a real APK, you need:');
    console.log('1. Android Studio installed');
    console.log('2. Android SDK configured');
    console.log('3. Run the build command in the android directory');
  });
});
