""" Invoke tasks """

from invoke import task

# @task
# def run(ctx):
#     """ Run the Flask server in dev mode """
#     ctx.run("flask run", env={
#         'FLASK_APP': 'socialmap',
#         'FLASK_DEBUG': 'true',
#     })


@task
def install(ctx):
    """ Make sure all the dependencies are installed """
    ctx.run("pip install -r requirements.txt -U")
    #ctx.run("pip install -e . -U")


# @task
# def build(ctx):
#     """ Build the docker container """
#     ctx.sudo("docker buiiild -t socialmap .")


# @task(default=True)
# def test(ctx):
#     """
#     Run all the tests.
#     This command will also get executed by CI.
#     """
#     ctx.run("flake8")
#     ctx.run("python socialmap/app-tests.py")