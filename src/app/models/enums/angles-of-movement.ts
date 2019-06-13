
export function getListAngles(){
  return [
    {id: 2, name: "Cuello",},
    {id: 4, name: "Hombro izquierdo"},
    {id: 8, name: "Hombro derecho"},
    {id: 5, name: "Codo izquierdo"},
    {id: 9, name: "Codo derecho"},
    {id: 6, name: "Muñeca izquerda"},
    {id: 10, name: "Muñeca derecha"},
    {id: 1, name: "Espalda"},
    {id: 12, name: "Cadera izquiera"},
    {id: 16, name: "Cadera derecha"},
    {id: 13, name: "Rodilla izquierda"},
    {id: 17, name: "Rodilla derecha"},
    {id: 15, name: "Píe Izquierdo"},
    {id: 19, name: "Píe Derecho"}];
}

export enum AnglesOfMovement{
  Neck = 2,
  ShoulderLeft = 4,
  ShoulderRight = 8,
  ElbowLeft = 5,
  ElbowRight = 9,
  WristLeft =  6,
  WristRight = 10,
  Spine = 1,
  HipLeft = 12,
  HipRight = 16,
  KnewLeft = 13,
  KnewRight = 17,
  FootLeft = 15,
  FootRight = 19
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