// src/lib/tags.ts

export type TagValue = string | number | boolean;

export interface Tag {
  key: string;
  value: TagValue;
}

export interface TaggableItem {
  id: string;
  tags: Tag[];
}

export function addTag(item: TaggableItem, key: string, value: TagValue): TaggableItem {
  return {
    ...item,
    tags: [...item.tags, { key, value }]
  };
}

export function removeTag(item: TaggableItem, key: string, value?: TagValue): TaggableItem {
  return {
    ...item,
    tags: item.tags.filter(tag => 
      !(tag.key === key && (value === undefined || tag.value === value))
    )
  };
}

export function findItemsByTag(items: TaggableItem[], key: string, value?: TagValue): TaggableItem[] {
  return items.filter(item => 
    item.tags.some(tag => 
      tag.key === key && (value === undefined || tag.value === value)
    )
  );
}