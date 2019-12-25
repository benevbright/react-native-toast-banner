update-example-rn:
	mkdir tmp
	cp -r example/src tmp
	rm -rf example
	npx react-native init example --template react-native-template-typescript
	cp -r tmp/src example
	rm -rf tmp
	rm example/App.tsx
	sed -i '' "s/import App from '.\/App';/import App from '.\/src\/App';/" example/index.js
	# install react-navigation
	cd example && yarn add react-navigation react-native-reanimated react-native-gesture-handler react-navigation-stack react-navigation-tabs
	# install peer-dependencies
	cd example && yarn add react-native-safe-area-view react-native-safe-area-context
	# install react-native-toast-banner
	cd example && yarn add react-native-toast-banner
	cd example && cd ios && pod install

clone-in-node-modules:
	rm -rf example/node_modules/react-native-toast-banner
	cd example/node_modules/ && git remote get-url origin | grep git | xargs git clone
	cd example/node_modules/react-native-toast-banner && yarn && yarn build