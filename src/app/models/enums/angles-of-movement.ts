
export function getListAngles(){
  return [
    {id: 0, name: "Cuello",},
    {id: 1, name: "Hombro izquierdo"},
    {id: 2, name: "Hombro derecho"},
    {id: 3, name: "Codo izquierdo"},
    {id: 4, name: "Codo derecho"},
    {id: 5, name: "Muñeca izquerda"},
    {id: 6, name: "Muñeca derecha"},
    {id: 7, name: "Espalda"},
    {id: 8, name: "Cadera izquiera"},
    {id: 9, name: "Cadera derecha"},
    {id: 10, name: "Rodilla izquierda"},
    {id: 11, name: "Rodilla derecha"},
    {id: 12, name: "Píe Izquierdo"},
    {id: 13, name: "Píe Derecho"}];
}

export enum AnglesOfMovement{
  Neck = 0,
  ShoulderLeft = 1,
  ShoulderRight = 2,
  ElbowLeft = 3,
  ElbowRight = 4,
  WristLeft =  5,
  WristRight = 6,
  Spine = 7,
  HipLeft = 8,
  HipRight = 9,
  KnewLeft = 10,
  KnewRight = 11,
  FootLeft = 12,
  FootRight = 13
}

export function getAngleName(angle:AnglesOfMovement):string{
  switch (angle) {
    case AnglesOfMovement.Neck:
      return "Cuello";
    case AnglesOfMovement.ShoulderLeft:
      return "Hombro izquierdo";
    case AnglesOfMovement.ShoulderRight:
      return "Hombro derecho";
    case AnglesOfMovement.ElbowLeft:
      return "Codo izquierdo";
    case AnglesOfMovement.ElbowRight:
      return "Codo derecho";
    case AnglesOfMovement.WristLeft:
      return "Muñeca izquierda";
    case AnglesOfMovement.WristRight:
      return "Muñeca derecha";
    case AnglesOfMovement.Spine:
      return "Espalda";
    case AnglesOfMovement.HipLeft:
      return "Cadera izquierda";
    case AnglesOfMovement.HipRight:
      return "Cadera derecha";
    case AnglesOfMovement.KnewLeft:
      return "Rodilla izquierda";
    case AnglesOfMovement.KnewRight:
      return "Rodilla derecha";
    case AnglesOfMovement.FootLeft:
      return "Píe izquierdo";
    case AnglesOfMovement.FootRight:
      return "Píe derecho";
    default: return "Ángulo no identificado";
  }
}