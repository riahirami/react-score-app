import DarkLightModeSwitch from 'components/DarkLightModeSwitch/DarkLightModeSwitch';
import LanguageSwitch from 'components/LanguageSwitch/LanguageSwitch';
import ShareGameCode from 'pages/GameScreen/Components/ShareGameCode/ShareGameCode';
import React, { ChangeEvent } from 'react';
import { StyledHeaderContainer } from './screenHeader.style';
import PreviewModeBadge from 'pages/GameScreen/Components/PreviewModeBadge/PreviewModeBadge';

interface ScreenHeaderProps {
  handleThemeModeChange: () => void;
  changeLanguage: (
    event: ChangeEvent<{
      value: unknown;
    }>,
  ) => void;
  currentLanguage: string;
  gameCode?: string;
  isPreviewMode: boolean;
  isScreenGame?: boolean;
}
const ScreenHeader = ({
  changeLanguage,
  currentLanguage,
  gameCode,
  handleThemeModeChange,
  isPreviewMode,
}: ScreenHeaderProps) => {
  return (
    <>
      <StyledHeaderContainer>
        <DarkLightModeSwitch onChangeAction={handleThemeModeChange} />
        {gameCode && <ShareGameCode />}

        <LanguageSwitch onChangeLanguageAction={changeLanguage} currentLanguage={currentLanguage} />
      </StyledHeaderContainer>
      {isPreviewMode && <PreviewModeBadge />}
    </>
  );
};

export default ScreenHeader;
