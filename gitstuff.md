git config --global user.email "email"
git config --global user.name "username"
git add .
git status //check the status of the package commits

gi

//normal git ops
git commit -m "message"


###Credential Management
https://techexpertise.medium.com/storing-git-credentials-with-git-credential-helper-33d22a6b5ce7

- git config --global credential.helper store
- git config --global credential.helper "store --file ~/.my-credentials"
