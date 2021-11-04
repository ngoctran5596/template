import {ThemeFontWeight} from '@theme/types';
import {TextProps} from 'react-native';
import {DefaultStyleProps} from '../utils';

export interface CommonTextProps extends DefaultStyleProps, TextProps {
  /**
   * Specifies font weight.
   *
   * Default is **"regular"**
   *
   * **xl** : fontSize: 22, lineHeight: 24, fontWeight: bold
   *
   * **lg** : fontSize: 16, lineHeight: 22, fontWeight: bold
   *
   * **p** : fontSize: 14, lineHeight: 20
   *
   * **s** : fontSize: 12, lineHeight: 18
   *
   * **xs** : fontSize: 10, lineHeight: 14
   */
  fontType?: keyof ThemeFontWeight;

  /**
   * Color of text - key of **Colors (theme/colors.ts)** or **Color keywords**
   *
   * Default is **"primaryText"**
   */
  color?: string;

  /**
   * Specifies text alignment. textAlign: 'center'
   */
  center?: boolean;

  /**
   * Specifies text alignment. textAlign: 'right'
   */
  right?: boolean;

  /**
   * Specifies text alignment. textAlign: 'justify'
   */
  justify?: boolean;

  /**
   * Size of text
   *
   * Default is **14**
   */
  size?: number;

  /**
   * Line height of text
   *
   * Default is **size** * 1.5
   */
  lineHeight?: number;

  /**
   * Background color of text - key of Colors (theme/colors.ts) or Color keywords
   */
  backgroundColor?: string;

  children?: any;
}
