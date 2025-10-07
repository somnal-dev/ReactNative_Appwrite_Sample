import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Note } from '../types/note';

export interface NoteListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

const NoteList = ({ notes, onEdit, onDelete }: NoteListProps) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={item => item.$id ?? '0'}
        renderItem={note => (
          <>
            <View style={styles.noteItem}>
              <Text style={styles.title}>{note.item.title}</Text>
              <Text>{note.item.content}</Text>
              <Button title={'수정'} onPress={() => onEdit(note.item)} />
              <Button
                title={'삭제'}
                onPress={() => onDelete(note.item.$id ?? '')}
              />
            </View>
          </>
        )}
      />
    </View>
  );
};

export default NoteList;

const styles = StyleSheet.create({
  container: {
    height: 400,
  },
  noteItem: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    fontWeight: 800,
  },
});
