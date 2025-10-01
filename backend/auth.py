from flask import Blueprint, render_template, redirect, url_for, request, flash
from werkzeug.security import generate_password_hash,check_password_hash
from .models import User
from . import db
from flask_login import UserMixin
from flask_login import login_user,login_required,current_user,logout_user
from flask import Flask,session
from datetime import timedelta
auth = Blueprint("auth", __name__)
@auth.route('/login', methods=["GET", "POST"])
def login():
    if current_user.is_authenticated:
        flash('You are already logged in!', category='info')
        return redirect(url_for('veiws.home'))

    if request.method == "POST":
        email = request.form.get('email')
        password = request.form.get('password')
        session.permanent=True
        existing_user = User.query.filter_by(email=email).first()

        if existing_user and check_password_hash(existing_user.password, password):
            # ✅ Log user in with Flask-Login
            login_user(existing_user, remember=True)

            # ✅ Store session info *after* successful login
            session["username"] = existing_user.username
            session["email"] = existing_user.email
            session["user_id"] = existing_user.id

            flash('Logged in successfully!', category='success')
            return redirect(url_for('veiws.home'))
        elif existing_user:
            flash('Incorrect password! Try again.', category='error')
        else:
            flash('Email does not exist! Try to sign up.', category='error')

    return render_template("login.html", User=current_user)


@auth.route('/register', methods=["GET", "POST"])
def register():
    if request.method == "POST":
        email = request.form.get('email')
        username = request.form.get('username')
        password1 = request.form.get('password1')
        password2 = request.form.get('password2')
        session["username"] = username
        session["email"] = email
        existing_User=User.query.filter_by(email=email).first()
        if existing_User:
            flash('email already exist',category='error')

        elif len(username) < 4:
            flash('Username must be at least 4 characters long.', category='error')
        elif password1 != password2:
            flash('Your passwords did not match.', category='error')
        elif len(password1) < 7:
            flash('Password must be at least 7 characters long.', category='error')
        else:
            # save user
            hashed_password = generate_password_hash(password1, method='pbkdf2:sha256')
            new_user = User(email=email, username=username, password=hashed_password)
            db.session.add(new_user)
            db.session.commit()
            login_user(new_user,remember=True)

            flash('Account successfully created!', category='success')
            return redirect(url_for('auth.login'))

    return render_template("register.html")
@auth.route('/logout', methods=["GET", "POST"])
@login_required
def logout():
    session.clear()
    logout_user()
    return redirect(url_for("auth.login"))
