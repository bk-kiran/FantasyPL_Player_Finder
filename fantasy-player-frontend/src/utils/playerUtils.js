// Position mapping
const POSITION_MAPPING = {
  'GK': 'Goalkeeper',
  'DF': 'Defender',
  'DF,FW': 'Defender, Forward',
  'DF,MF': 'Defender, Midfielder',
  'MF,DF': 'Midfielder, Defender',
  'MF': 'Midfielder',
  'FW,MF': 'Winger',
  'MF,FW': 'Attacking Midfielder',
  'FW': 'Attacker',
};

// Helper function to convert position abbreviations to full names
export const getFullPositionName = (shortPosition) => {
  if (!shortPosition) return 'Unknown';
  
  const upperPosition = shortPosition.toUpperCase().trim();
  return POSITION_MAPPING[upperPosition] || shortPosition;
};