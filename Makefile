update-example-rn:
	mkdir tmp
	cp -r example/src tmp
	cp example/metro.config.js tmp
	rm -rf example
	npx react-native init example --template react-native-template-typescript
	cp -r tmp/src example
	cp tmp/metro.config.js example
	rm -rf tmp
	rm example/App.tsx
	sed -i '' "s/import App from '.\/App';/import App from '.\/src\/App';/" example/index.js
	# install react-navigation
	sh -c 'cd example && yarn add react-navigation react-native-reanimated react-native-gesture-handler react-navigation-stack react-navigation-tabs'
	# install peer-dependencies
	sh -c 'cd example && yarn add react-native-safe-area-view react-native-safe-area-context'
	# install react-native-toast-banner
	sh -c 'cd example && yarn add react-native-toast-banner'
	sh -c 'cd example && cd ios && pod install'
