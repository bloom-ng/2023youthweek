export const ParticipantTypes = [
    {key: 0, name: "Host"},
    {key: 1, name: "Guest"},
]

export const GroupTypes = [
    {key: 1, name: "Abidoye"},
    {key: 2, name: "Ogundele"},
    {key: 3, name: "Odudare"},
]

export const getGroupType = (group) => {
    switch (group) {
        case 1:
            return "Abidoye"
        case 2:
            return "Ogundele"
        case 3:
            return "Odudare"
    
        default:
            return "";
    }
}

export const getParticipantType = (type) => {
    switch (type) {
        case 0:
            return "Host"
        
        default:
            return "Guest";
    }
}