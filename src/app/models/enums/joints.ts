
export function getListJoints() {
  return [
    { id: 0, name: "Cadera central", },
    { id: 1, name: "Centro de la espalda" },
    { id: 2, name: "Cuello" },
    { id: 3, name: "Cabeza" },
    { id: 4, name: "Hombro izquierdo" },
    { id: 5, name: "Codo izquierdo" },
    { id: 6, name: "Muñeca izquierda" },
    { id: 7, name: "Mano izquierda" },
    { id: 8, name: "Hombro derecho" },
    { id: 9, name: "Codo derecho" },
    { id: 10, name: "Muñeca derecha" },
    { id: 11, name: "Mano derecha" },
    { id: 12, name: "Cadera izquierda" },
    { id: 13, name: "Rodilla izquierda" },
    { id: 14, name: "Tobillo izquierdo" },
    { id: 15, name: "Pie izquierdo" },
    { id: 16, name: "Cadera derecha" },
    { id: 17, name: "Rodilla derecha" },
    { id: 18, name: "Tobillo derecho" },
    { id: 19, name: "Pie derecho" },
    { id: 20, name: "Centro de los hombros" },
  ];
}

export enum Joints {
  SpineBase = 0,
  SpineMiddle = 1,
  Neck = 2,
  Head = 3,
  LeftShoulder = 4,
  LeftElbow = 5,
  LeftWrist = 6,
  LeftHand = 7,
  RightShoulder = 8,
  RightElbow = 9,
  RightWrist = 10,
  RightHand = 11,
  LeftHip = 12,
  LeftKnee = 13,
  LeftAnkle = 14,
  LeftFoot = 14,
  RightHip = 16,
  RightKnee = 17,
  RightAnkle = 18,
  RightFoot = 19,
  SpineShoulder = 20
}

export function getJointName(joint: number): string {
  switch (joint) {
    case 0:
      return "Cadera central";
    case 1:
      return "Centro de la espalda";
    case 2:
      return "Cuello";
    case 3:
        return "Cabeza";
    case 4:
      return "Hombro izquierdo";
    case 5:
      return "Codo izquierdo";
    case 6:
      return "Muñeca izquierda";
    case 7:
      return "Mano izquierda";
    case 8:
      return "Hombro derecho";
    case 9:
      return "Codo derecho";
    case 10:
      return "Muñeca derecha";
    case 11:
      return "Mano derecha";
    case 12:
      return "Cadera izquierda";
    case 13:
      return "Rodilla izquierda";
    case 14:
      return "Tobillo izquierdo";
    case 15:
      return "Pie izquierdo";
    case 16:
      return "Cadera derecha";
    case 17:
      return "Rodilla derecha";
    case 18:
      return "Tobillo derecho";
    case 19:
      return "Pie derecho";
    case 20:
      return "Centro de los hombros";
    default: return "Articulacion no identificada";
  }
}