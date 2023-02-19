import { read, utils } from 'xlsx';
import { IMono, IPrivat } from '../interfaces';
import { parseMono } from './parse-mono';
import { parsePrivat } from './parse-privat';

export const parseStatement = async (files: FileList | null) => {
  if (files) {
    const file = files[0];
    const arrayBuffer = await file.arrayBuffer();
    const workBook = read(arrayBuffer);
    const workSheet = workBook.Sheets[workBook.SheetNames[0]];
    if (workBook.SheetNames[0] === 'Виписки') {
      const data = utils.sheet_to_json(workSheet, { header: 1 }) as IPrivat[];
      return parsePrivat(data);
    }
    if (workBook.SheetNames[0] === 'Рух коштів по картці') {
      const data = utils.sheet_to_json(workSheet, { header: 1 }) as IMono[];
      return parseMono(data);
    }
  }
};
