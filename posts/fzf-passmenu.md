---
title: "Streamline password management on MacOS with pass & fzf"
date: "2023-01-05"
---

I use [`pass`](https://www.passwordstore.org/) and this simple shell script that searches `.gpg` files in `~/.password-store` or `PASSWORD_STORE_DIR` (if set) and pipes into [`fzf`](https://https//github.com/junegunn/fzf):

```bash
#!/usr/bin/env bash

pushd "${PASSWORD_STORE_DIR:-$HOME/.password-store}"
PASSFILE=`fd -t file -e gpg --color=always | sed 's/\.gpg//; s/^\.\///' | fzf --ansi`
popd

[ -z "$PASSFILE" ] && exit 0

pass -c $PASSFILE 1>/dev/null
```

[iCanHazShortcut](https://github.com/deseven/iCanHazShortcut) let me assign shortcuts to my script. Pressing **<kbd>Command</kbd>** + **<kbd>P</kbd>** runs `alacritty -e sh -c '~/bin/fzf-passmenu'`, which opens a new terminal window and runs the script. It's a fast and simple process.
