import { Grid, styled } from '@mui/material';
import { colors } from 'utils/colors';

export const StyledBadgeContainer = styled(Grid)(() => ({
  backgroundColor: colors.RED,
  rotate: '41deg',
  padding: 5,
  color: colors.WHITE,
  position: 'fixed',
  top: 25,
  left: '90%',
  width: 200,
  textAlign: 'center',
}));

export const StyledRibbon = styled('div')(() => ({
  fontSize: '22px', // Corrected font-size syntax
  fontWeight: 'bold', // Corrected font-weight syntax
  color: '#fff', // Corrected color syntax
  '--f': '.1em', // Control the folded part
  '--r': '.8em', // Control the ribbon shape
  position: 'absolute',
  top: '20px',
  right: 'calc(-1 * var(--f))',
  paddingInline: '.25em',
  lineHeight: '1.8',
  background: colors.RED,
  borderBottom: 'var(--f) solid rgba(0, 0, 0, 0.3)',
  borderLeft: 'var(--r) solid rgba(0, 0, 0, 0)',
  clipPath: `
    polygon(0 0, 100% 0, 100% calc(100% - var(--f)), calc(100% - var(--f)) 100%, 
    calc(100% - var(--f)) calc(100% - var(--f)), 0 calc(100% - var(--f)), 
    var(--r) calc(50% - var(--f) / 2))
  `,
}));

export const StyledRibbonNext = styled('div')(() => ({
  fontSize: '20px',
  fontWeight: 'bold',
  color: colors.WHITE,
  '--f': '.5em',
  position: 'fixed',
  top: '0',
  right: '0',
  lineHeight: '1.8',
  paddingInline: '1lh',
  paddingBottom: 'var(--f)',
  backgroundColor: colors.RED,
  borderImage: 'conic-gradient(#0008 0 0) 51%/var(--f)',
  clipPath:
    'polygon(100% calc(100% - var(--f)), 100% 100%, calc(100% - var(--f)) calc(100% - var(--f)), var(--f) calc(100% - var(--f)), 0 100%, 0 calc(100% - var(--f)), 999px calc(100% - var(--f) - 999px), calc(100% - 999px) calc(100% - var(--f) - 999px))',
  transform: 'translate(calc((1 - cos(45deg)) * 100%), -100%) rotate(45deg)',
  transformOrigin: '0% 100%',
}));
