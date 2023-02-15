export const validName = new RegExp('^[a-zA-Z]{2,40}$');

export const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');

export const validPhone = new RegExp("^[0-9]{10}$");

export const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');