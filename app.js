import firebase from 'firebase/app'
import 'firebase/storage'
import {upload} from './upload'


const firebaseConfig = {
    apiKey: "AIzaSyA3XhQaIwt85GOdcciJ0Ir3fxd8X2Ml0_4",
    authDomain: "fe-upload-355bb.firebaseapp.com",
    projectId: "fe-upload-355bb",
    storageBucket: "fe-upload-355bb.appspot.com",
    messagingSenderId: "613602303624",
    appId: "1:613602303624:web:034f047678af0763b5493d"
}

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

upload('#file', {
    multi: true,
    accept: ['.png', '.jpg', '.jpeg', '.gif'],
    onUpload(files, blocks) {
        files.forEach((file, index) => {
            const ref = storage.ref(`images/${file.name}`)
            const task = ref.put(file)

            task.on('state_changed', snapshot => {
                const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%'
                const block = blocks[index].querySelector('.preview-info-progress')
                block.textContent = percentage
                block.style.width = percentage 
            }, error => {
                console.log(error)
            }, () => {
                task.snapshot.ref.getDownloadURL().then(url => {
                    console.log('Download URL', url)
                })
            })
        })
    }
})





