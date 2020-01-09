# Instagreen
Small web app to compute carbon footprint based on one's Instagram pictures

## Backend

### Install

In the `backend/` directory, run:

```bash
# Install a local virtualenv in the "venv_instagreen" folder
virtualenv --python=python3 ~/venv_instagreen
# Activate the virtualenv
source ~/venv_instagreen/bin/activate
# Install the dependencies inside the virtualenv
pip install -r requirements.txt -U
# Now that you have "invoke" installed you can just do:
inv install
```

### Run

In the `backend/` directory, run `dev/bin/start` to run the API server
in development mode.

## Frontend

In the `web/` directory, run `deb/bin/start` to install and run the React app.
