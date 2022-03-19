update-example-rn:
	mkdir tmp
	cp -r example/src example/App.tsx example/babel.config.js example/metro.config.js tmp
	rm -rf example
	npx react-native init example --template react-native-template-typescript
	cp -r tmp/* example
	rm -rf tmp
	# uninstall @types/react-native
	cd example && npm uninstall @types/react-native
	cd example && npm install -D babel-plugin-module-resolver
	# install react-navigation
	cd example && npm install react-navigation react-native-reanimated react-native-gesture-handler react-navigation-stack react-navigation-tabs
	# install peer-dependencies
	cd example && npm install react-native-safe-area-context
	cd example && cd ios && pod install
