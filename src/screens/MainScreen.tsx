import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Note } from '../types/note';
import NoteList from '../components/NoteList';
import { client, database } from '../apis/server';
import { ID } from 'appwrite';

const MainScreen = () => {
  const [connectionResult, setConnectionResult] = useState('');
  const [loadResult, setLoadResult] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteCount, setNoteCount] = useState(0);

  const [noteId, setNoteId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    ping();
    load();
  }, []);

  const ping = async () => {
    try {
      const result = await client.ping();

      setConnectionResult(`Appwrite 연결 성공 : ${JSON.stringify(result)}`);
    } catch (error) {
      setConnectionResult(`Appwrite 연결 실패 : ${error}`);
    }
  };

  const load = async () => {
    try {
      const data = await database.listRows({
        databaseId: '68e5368b003016fe81c5',
        tableId: 'note',
      });

      const newNotes: Note[] = data.rows.map((row: any) => ({
        $id: row.$id,
        title: row.title,
        content: row.content,
      }));

      setNotes(newNotes);
      setNoteCount(data.total);
      setLoadResult('불러오기 완료');
    } catch (error) {
      setNotes([]);
      setNoteCount(0);
      setLoadResult(`불러오기 실패 : ${error}`);
    }
  };

  const handleConfirmClick = async () => {
    try {
      await database.upsertRow({
        databaseId: '68e5368b003016fe81c5',
        tableId: 'note',
        rowId: noteId ?? ID.unique(),
        data: {
          title: title,
          content: content,
        },
      });

      setTitle('');
      setContent('');
      setNoteId(null);
      setLoadResult('CREATE 성공');
      load();
    } catch (error) {
      setLoadResult(`오류 : ${error}`);
    }
  };

  const handleOnDelete = async (id: string) => {
    try {
      await database.deleteRow({
        databaseId: '68e5368b003016fe81c5',
        tableId: 'note',
        rowId: id,
      });

      setLoadResult('DELETE 성공');
      load();
    } catch (error) {
      setLoadResult(`오류 : ${error}`);
    }
  };

  const handleKakaoLoginClick = () => {};
  const handleNaverLoginClick = () => {};

  return (
    <View style={styles.container}>
      <Button title={'카카오 로그인'} onPress={handleKakaoLoginClick} />
      <Button title={'네이버 로그인'} onPress={handleNaverLoginClick} />

      <Text>{connectionResult}</Text>
      <Text>{loadResult}</Text>

      <Text style={styles.noteCount}>노트 갯수 : {noteCount}</Text>

      <TextInput
        style={styles.textInput}
        value={title}
        onChangeText={setTitle}
        placeholder={'타이틀'}
      />
      <TextInput
        style={styles.textInput}
        value={content}
        onChangeText={setContent}
        placeholder={'내용'}
      />

      <Button title={'확인'} onPress={handleConfirmClick} />

      <NoteList
        notes={notes}
        onEdit={note => {
          setNoteId(note.$id);
          setTitle(note.title);
          setContent(note.content);
        }}
        onDelete={handleOnDelete}
      />
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noteCount: {
    marginTop: 40,
  },
  textInput: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 12,
    padding: 10,
  },
});
