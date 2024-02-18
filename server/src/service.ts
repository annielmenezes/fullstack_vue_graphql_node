import { execute } from './database.ts';

export const getItemsByType = (type: string) =>
  execute('select * from namegator.item where type = $1', [type]);

export const getItems = () => execute('select * from namegator.item');

export const saveItem = (item) =>
  execute(
    'insert into namegator.item (type, description) values ($1, $2) return *',
    [item.type, item.description]
  );

export const deleteItem = (id) =>
  execute('delete from namegator.item where id = $1', [id]);
