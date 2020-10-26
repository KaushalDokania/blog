---
title: "How to Customize Linux PS1 Bash Prompt"
date: 2020-02-23T19:29:00+05:30
draft: false
author: "Kaushal Dokania"
toc: false
images:
tags:
  - linux
  - customization
---

We spend a lot of time on Linux bash shell either using Git, writing/running scripts, building/serving applications or analyzing server logs. That's why we need a bash prompt which gives us important information and is also easy to read. To improve the look and feel even further you can also add colors to your `PS1` prompt.

## What is PS1?

`PS1`(Prompt String 1) is one of the shell prompts available in Linux/Unix. Once you log into a machine, you are presented with a prompt like `kaushal@ubuntu:~ $` where you enter commands to run. Here, **$** represents a normal user while the root user is represented by **#**. On most Linux distros the `PS1` prompt displays the current user, hostname and current directory by default.

### What are the different PS variables?

According to the bash documentation:

    PS1    The  value  of  this parameter is expanded (see PROMPTING below)
           and used as the primary prompt string.   The  default  value  is
           ``\s-\v\$ ''.
    PS2    The  value of this parameter is expanded as with PS1 and used as
           the secondary prompt string.  The default is ``> ''.
    PS3    The value of this parameter is used as the prompt for the select
           command (see SHELL GRAMMAR above).
    PS4    The  value  of  this  parameter  is expanded as with PS1 and the
           value is printed before each command  bash  displays  during  an
           execution  trace.  The first character of PS4 is replicated mul‐
           tiple times, as necessary, to indicate multiple levels of  indi‐
           rection.  The default is ``+ ''.

So, `PS1` is the the first prompt string which you see and where you enter commands to run, `PS2` is the continuation prompt which comes up in case the command you entered is incomplete or the primary command needs more inputs, `PS3` is shown when `select` command waits for input, and `PS4` shows the debugging trace line prefix during the execution of any command or script.

### How to know your current PS1 variable?

Simply print the `PS1` value using echo

    echo $PS1

Output prompt: **[\u@\h \W]\$**

The following is the list of escape characters supported by the PS variables in Linux.

    \a - A bell character.
    \d - The date, in "Weekday Month Date" format (e.g., "Tue May 26").
    \D{format} - The format is passed to strftime(3) and the result is inserted into the prompt string; an empty format results in a locale-specific time representation. The braces are required.
    \e - An escape character.
    \h - The hostname, up to the first ‘.’.
    \H - The hostname.
    \j - The number of jobs currently managed by the shell.
    \l - The basename of the shell’s terminal device name.
    \n - A newline.
    \r - A carriage return.
    \s - The name of the shell, the basename of $0 (the portion following the final slash).
    \t - The time, in 24-hour HH:MM:SS format.
    \T - The time, in 12-hour HH:MM:SS format.
    \@ - The time, in 12-hour am/pm format.
    \A - The time, in 24-hour HH:MM format.
    \u - The username of the current user.
    \v - The version of Bash (e.g., 2.00)
    \V - The release of Bash, version + patchlevel (e.g., 2.00.0)
    \w - The current working directory, with $HOME abbreviated with a tilde (uses the $PROMPT_DIRTRIM variable).
    \W - The basename of $PWD, with $HOME abbreviated with a tilde
    \! - The history number of this command.
    \# - The command number of this command.
    \$ - If the effective uid is 0, #, otherwise $.
    \nnn - The character whose ASCII code is the octal value nnn.
    \\ - A backslash.
    \[ - Begin a sequence of non-printing characters. This could be used to embed a terminal control sequence into the prompt.
    \] - End a sequence of non-printing characters.

## How to modify or change the PS1 prompt?

To modify the prompt simply set the `PS1` environment variable with the desired value.

    PS1="Welcome user"

Output prompt: **Welcome user**

### More Examples

1. To set `PS1` to your current directory you can use

        PS1="$PWD> "

    Output prompt: **/home/kaushal>**

    **Note:** This prompt is static and will not change when you move to a new directory.

2. Now, let us change the prompt to display today's date and hostname:

        PS1="\d \h $ "

    Output prompt: **Sun Feb 23 ubuntu $**

3. Below `PS1` will display date/time, hostname and the current working directory.

        PS1="[\d \t \u@\h:\w ] $ "

    Output prompt: **[Sun Feb 23 18:01:40 kaushal@ubuntu:~ ] $**

4. You can also use functions in `PS1` prompt. Suppose you want to track free RAM available then add the below function in your `~/.bashrc` file

    free_ram () { free -m | awk '{print $4}' | head -2 | tail -1; }

    and set the `PS1` value to

        PS1='$(free_ram)Mb [\u@\h \W]$ '

    Output prompt: **1764Mb [kaushal@ubuntu ~]$

5. You can also divide the prompt into multiple lines using **\n** for long commands

        PS1="[\t]\w\n\u@\h:$"

    Output prompt:

    **[18:32:13]~/workspace  
    kaushal@ubuntu:$**

## Making the changes permanent

When you set the `PS1` in the console the changes are temporarily and are available only for that session. To make the changes permanent add the `PS1` variable in your user profile file.

    nano ~/.bashrc

To save, hit `CTRL + X` and enter `Y`. The changes will come in affect next time you login to the terminal.

Modifying `~/.bashrc` causes changes to be applicable only for the current user. To make the changes permanent for all the users add the `PS1` variable to the following file

- `/etc/bashrc` for Redhat and friends
- `/etc/bash.bashrc` for Debian/Ubuntu
- `/etc/bash.bashrc.local` for Suse and others

## Conclusion

Modifying the bash prompt is pretty easy and very helpful as it can display any extra information we need. We can also add styles to the `PS1` prompt using colors which makes the prompt pleasing to the eyes and more readable in case your screen is full of several commands and outputs.

Thanks for reading.