import DefaultIos from './Picker.ios';
import * as ios from './Picker.ios';
import DefaultAndroid from './Picker.android';
import * as android from './Picker.android';

declare var _test: typeof ios;
declare var _test: typeof android;

declare var _testDefault: typeof DefaultIos;
declare var _testDefault: typeof DefaultAndroid;

export * from './Picker.ios';
export default DefaultIos;
