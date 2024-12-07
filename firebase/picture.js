
  async function updateMyProfile() {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      toast.error("User is not authenticated!");
      return;
    }

    const collectionRef = doc(db, "users", uid);

    if (!picture) {
      const { email, uid } = userrr;
      const user = {
        userName: name,
        fathername,
        phonenumber,
        DOB,
        bio,
        email,
        uid,
      };
      await setDoc(collectionRef, user, { merge:true });
      saveUser(user);
      toast.success("Updated Successfully!");
      return;
    }

    try {
      const uploadImage = async () => {
        if (!picture) {
          return;
        }
        const imageRef = ref(
          storage,
          `uploads/images/${crypto.randomUUID()}-${picture.name}`
        );
        const uploadTask = uploadBytesResumable(imageRef, picture);

        return new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
            },
            (error) => {
              console.error("Upload error: ", error);
              reject(error);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              console.log("File available at", downloadURL);
              resolve(downloadURL);
            }
          );
        });
      };

      const imageURL = await uploadImage();

      if (!imageURL) return toast.error("error uploading image");

      const { email, uid } = userrr;
      const user = {
        imageURL,
        userName: name ,
        fathername,
        phonenumber,
        DOB,
        bio,
        email,
        uid,
      };
      await setDoc(collectionRef, user, { merge: true });
      saveUser(user);
      toast.success("Updated Successfully!");
    } 
    catch (error) {
      console.error("Error Updating : ", error);
      toast.error(`Error Updating! ${error}`);
    }
  }