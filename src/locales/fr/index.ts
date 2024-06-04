export const fr = {
  app_name: 'Score App',
  not_found_page_title: '404 Page not found',
  Game: 'Partie',
  Game_mode: 'Mode  Equipe',
  Game_score: 'Score à atteindre',
  Player_number: 'Nombre des joueurs',
  Winner_is: 'gagne avec un score',
  Winner_message: 'Te5ser a youssef',
  Game_Settings: {
    Player_number: 'Nombre des joueurs',
    Game_type: 'Type de jeu',
    Final_score: 'Score à atteindre',
    Player_name: 'Joueur',
    Game_Mode: {
      Team: 'Equipe',
      Single: 'Individuel',
    },
  },
  Game_Actions: {
    Quit: 'Quitter',
    Replay: 'Rejouer',
    New_Game: 'Nouvelle Partie',
    Join_Game: 'Suivre une partie',
    Resume_Game: 'Reprendre la partie',
    Code: 'Code de la partie',
  },
  GameTypeEnum: {
    Rami: 'Rami',
    Chkobba: 'Chkobba',
  },
  Score: 'Score',
  Modal: {
    Common: {
      Yes: 'Oui',
      No: 'Non',
      Cancel: 'Annuler',
      Confirm: 'Confirmer',
      Ok: 'Ok',
    },
    Exit: {
      title: 'Quitter la partie',
      content: 'Vous êtes sur le point de quitter le jeu, êtes-vous sûr ?',
      resumeGameNote: 'Vous pouvez reprendre la partie plus tard en utilisant le ce code :',
    },
    Share_Code: {
      title: 'Code de la partie',
      Description: "Pour partager le jeu avec vos amis pour qu'ils puissent suivre la partie  ",
      byCode: 'Partager ce code',
      byLink: 'Partager ce lien',
      buQrCode: 'Scanner le QR code',
      or: 'Ou',
    },
    Game_Over: {
      title: 'La partie est terminée',
      content: 'La partie est déja terminée, vous pouvez pas la rejoindre !',
    },
    Resume_Game: {
      title: 'Reprendre la partie',
      content: 'Vous avez un code de partie, voulez-vous le continuer ?',
    },
    Unauthorized: {
      title: 'Non autorisé',
      content: "Vous n'êtes pas autorisé à accéder à cette partie !",
    },
  },
  No_data_to_display: 'Pas de données à afficher pour le moment !',
  Preview_Mode: 'Prévisualisation',
  Language: 'Langue',
  refetch: 'Refetch',
  fetching: 'Fetching',
  false: 'False',
  this_button_clicked_times: 'This button is clicked {{buttonClickedCount}} times',
  this_button_clicked_time: 'This button is clicked {{buttonClickedCount}} time',
  this_data_is_refetched_times: 'This data is refetched {{refetchCount}} times',
  this_data_is_refetched_time: 'This data is refetched {{refetchCount}} time',
};

export default fr;
export type TranslationsType = typeof fr;
