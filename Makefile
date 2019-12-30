update-example-rn:
	mkdir tmp
	cp -r example/src example/App.tsx example/babel.config.js example/metro.config.js tmp
	rm -rf example
	npx react-native init example --template react-native-template-typescript
	cp -r tmp/* example
	rm -rf tmp
	cd example && yarn add -D babel-plugin-module-resolver
	# install react-navigation
	cd example && yarn add react-navigation react-native-reanimated react-native-gesture-handler react-navigation-stack react-navigation-tabs
	# install peer-dependencies
	cd example && yarn add react-native-safe-area-view react-native-safe-area-context
	# install react-native-toast-banner
	cd example && yarn add react-native-toast-banner
	cd example && cd ios && pod install
