import { Injectable, inject } from '@angular/core';

import { getFirestore, setDoc, getDoc, addDoc, doc, updateDoc, collection, collectionData, query } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, uploadString, ref, getDownloadURL } from 'firebase/storage';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  firestore = inject(AngularFireStorage);


  // =============== BASE DE DADOS FIRESTORE ================
  // ==== Setar um documento ====
  async setDocument(path: string, data: any) {
    return await setDoc(doc(getFirestore(), path), data);
  }
  // ==== Obter um documento ====
  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }
  // ==== Atualizar um documento ====
  async updateDocument(path: string, data: any) {
    return await updateDoc(doc(getFirestore(), path), data);
  }
  // ==== Add um documento ====
  addDocument(path: string = "user", data: any) {
    return addDoc(collection(getFirestore(), path), data);
  }
  // ==== Lista de user ======
  getColletionData(path: string, collectionQurey?: any) {
    const ref = collection(getFirestore(), path);
    return collectionData(query(ref, collectionQurey));
  }

  // =============== upload de image ================
  async uploadImage(path: string, data_url: string) {
    return uploadString(ref(getStorage(), path), data_url, 'data_url').then(() => {
      return getDownloadURL(ref(getStorage(), path))
    })
  }
  
}
