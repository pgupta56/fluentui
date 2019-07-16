import { ICheckStyleProps, ICheckStyles } from './Check.types';
import { HighContrastSelector, IStyle, getGlobalClassNames } from '../../Styling';
import { getRTL } from '../../Utilities';

const GlobalClassNames = {
  root: 'ms-Check',
  circle: 'ms-Check-circle',
  check: 'ms-Check-check',
  checkHost: 'ms-Check-checkHost'
};

export const getStyles = (props: ICheckStyleProps): ICheckStyles => {
  const { checkBoxHeight = '18px', checked, className, theme } = props;

  const { palette, semanticColors } = theme;
  const isRTL = getRTL();

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const sharedCircleCheck: IStyle = {
    fontSize: checkBoxHeight,
    position: 'absolute',
    left: 0,
    top: 0,
    width: checkBoxHeight,
    height: checkBoxHeight,
    textAlign: 'center',
    verticalAlign: 'middle'
  };

  return {
    root: [
      classNames.root,
      theme.fonts.medium,
      {
        // lineHeight currently needs to be a string to output without 'px'
        lineHeight: '1',
        width: checkBoxHeight,
        height: checkBoxHeight,
        verticalAlign: 'top',
        position: 'relative',
        userSelect: 'none',

        selectors: {
          ':before': {
            content: '""',
            position: 'absolute',
            top: '1px',
            right: '1px',
            bottom: '1px',
            left: '1px',
            borderRadius: '50%',
            opacity: 1,
            background: semanticColors.bodyBackground
          },

          [`.${classNames.checkHost}:hover &, .${classNames.checkHost}:focus &, &:hover, &:focus`]: {
            opacity: 1
          }
        }
      },

      checked && [
        'is-checked',
        {
          selectors: {
            ':before': {
              background: palette.themePrimary,
              opacity: 1,
              selectors: {
                [HighContrastSelector]: {
                  background: 'Window'
                }
              }
            }
          }
        }
      ],
      className
    ],

    circle: [
      classNames.circle,
      sharedCircleCheck,

      {
        color: palette.neutralSecondary,

        selectors: {
          [HighContrastSelector]: {
            color: 'WindowText'
          }
        }
      },

      checked && {
        color: palette.white
      }
    ],

    check: [
      classNames.check,
      sharedCircleCheck,

      {
        opacity: 0,
        color: palette.neutralSecondary,
        fontSize: '16px',
        left: isRTL ? '-0.5px' : '.5px', // for centering the check icon inside the circle.

        selectors: {
          ':hover': {
            opacity: 1
          },

          [HighContrastSelector]: {
            MsHighContrastAdjust: 'none'
          }
        }
      },

      checked && {
        opacity: 1,
        color: palette.white,
        fontWeight: 900,

        selectors: {
          [HighContrastSelector]: {
            border: 'none',
            color: 'WindowText'
          }
        }
      }
    ],

    checkHost: classNames.checkHost
  };
};
