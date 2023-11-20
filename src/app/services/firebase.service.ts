import { Injectable, inject } from '@angular/core';

import { getFirestore, setDoc, getDoc, addDoc, doc, updateDoc, collection, collectionData, query } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, uploadString, ref, getDownloadURL } from 'firebase/storage';
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
  getAuth(){
    return getAuth();
  }
  // google login
  loginGoogle() {
    return this.auth.signInWithPopup(new GoogleAuthProvider())
      .then((user) => {
        this.utilsSvc.routerLink('inspection-list');
        console.log("conectado______ : " + user);

        // // ==== caminho do db ==== 
        let path = `user/${user.user?.uid}`;
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
                // this.utilsSvc.saveInLocalStore('user', resp);
              }).catch(err=>console.log(err));
            } else {
              console.log('nao existe o user no db!');
              // === gravar o user no db
              this.setDocument(path, userLS).then(user=>{
              // === gravar no localStorage
              // this.utilsSvc.saveInLocalStore('user', userLS);
              }).catch(err=>console.log("NAO GRAVOU NO FAIREBASE: "+err));
            }
          })
          .catch(err => console.log(err))
          .finally()

      })  
      .catch(error => console.log(error));
  }
 // ====== desconectar Usuario ====
 desconectarGoogle() {
  this.auth.signOut().then(() => {
    this.utilsSvc.routerLink('/');
    });
}


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
