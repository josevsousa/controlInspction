import { Injectable, inject } from '@angular/core';

import { getFirestore, setDoc, getDoc, addDoc, deleteDoc, doc, updateDoc, collection, collectionData, query } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, uploadString, ref, getDownloadURL, deleteObject } from 'firebase/storage';
// auth
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, getAuth } from '@angular/fire/auth';
import { UtilsService } from './utils.service';
import { User } from '../models/user.model';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  utilsSvc = inject(UtilsService);
  firestore = inject(AngularFireStorage);
  auth = inject(AngularFireAuth)


  // =============== AUTH ================
  // user
  getAuth() {
    return getAuth();
  }
  // google login
  loginGoogle() {
    return this.auth.signInWithPopup(new GoogleAuthProvider())
      .then((user) => {
        this.utilsSvc.routerLink('inspecao');

        // // ==== caminho do db ==== 
        let path = `users/${user.user?.uid}`;
        // ==== usuario ==== 
        let userLS: User = {
          uid: user.user?.uid,
          name: user.user?.displayName,
          email: '',
          photoUrl: user.user?.photoURL,
          active: true
        }

        // verificar se o user ja existe
        this.getDocument(path)
          .then(resp => {
            if (resp) {
              console.log('existe o user no db!')
              //=== atualizar que o user esta on ===
              this.updateDocument(path, {
                ativo: true
              }).then(user => {
                // === gravar no localStorage
                 this.utilsSvc.saveInLocalStorage('user', resp);
              }).catch(err => console.log(err));
            } else {
              console.log('nao existe o user no db!');
              // === gravar o user no db
              this.setDocument(path, userLS).then(user => {
                // === gravar no localStorage
                this.utilsSvc.saveInLocalStorage('user', userLS);
              }).catch(err => console.log("NAO GRAVOU NO FAIREBASE: " + err));
            }
          })
          .catch(err => console.log(err))
          .finally()

      })
      .catch(error => console.log(error));
  }
  // ====== desconectar Usuario ====
  desconectarGoogle() {
    this.auth.signOut().then(()=> {
      localStorage.clear();
      this.utilsSvc.routerLink('/auth');
    });
  }

  
  // =============== BASE DE DADOS FIRESTORE ================
  // ==== Setar um documento passando um uid ====
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }
  // ==== Deletar um documento passando um uid ====
  deletarDocument(path: string) {
    return deleteDoc(doc(getFirestore(), path));
  }
  // ==== Obter um documento ====
  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }
  // ==== Atualizar um documento ====
  updateDocument(path: string, data: any) {
    return updateDoc(doc(getFirestore(), path), data);
  }
  // ==== Add um documento com uid gerado pelo firebase ====
  addDocument(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data);
  }
  // ==== Lista de documentos ======
  getColletionData(path: string, collectionQurey?: any) {
    const ref = collection(getFirestore(), path);
    return collectionData(query(ref, collectionQurey));
  }

  // =============== upload de image ================
  async uploadImage(path: string, data_url: any) {
    return uploadString(ref(getStorage(), path), data_url, 'data_url').then(() => {
      return getDownloadURL(ref(getStorage(), path))
    })
  }
    // =============== Obter rota da image com sua url ================
    async getFilePath(url: string){
      return ref(getStorage(), url).fullPath
    }
    // =============== Deletar arquivo =================
    deletarFile(path: string){
      return deleteObject(ref(getStorage(), path));
    }

    // =============== qtd de arquiovos =================
    async contaRegistros(path: string){
      let qtd = '4';
      return qtd;
    }

}
