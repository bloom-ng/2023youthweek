export const ParticipantTypes = [
  { key: 0, name: "Host" },
  { key: 1, name: "Guest" },
];

export const GroupTypes = [
  { key: 1, name: "Abidoye - Grey" },
  { key: 2, name: "Ogundele - White" },
  { key: 3, name: "Odudare - Orange" },
];

export const getGroupType = (group) => {
  switch (group) {
    case 1:
      return "Abidoye - Grey";
    case 2:
      return "Ogundele - white";
    case 3:
      return "Odudare - Orange";

    default:
      return "";
  }
};

export const getParticipantType = (type) => {
  switch (type) {
    case 0:
      return "Host";

    default:
      return "Guest";
  }
};
