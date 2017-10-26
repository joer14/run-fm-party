#!/usr/bin/env python
import os, shutil
from subprocess import call

# when updating/deploying the app, copy over the frontend dir to a temporary directory
# this is because zappa exclude isn't working for subdirectories, at least for me.
def build_and_copy_frontend(self):
    current_path = os.path.dirname(os.path.realpath(__file__))
    src_path = os.path.join(current_path,'frontend','build')
    dest_path = os.path.join(current_path,'build')
    # delete the build folder and it's contents already exist
    if os.path.islink(dest_path):
        os.unlink(dest_path)
    elif os.path.isdir(dest_path):
        shutil.rmtree(dest_path)
    print 'deleted build folder'
    # build the frontend too
    status = call(["yarn","build"],cwd= os.path.join(current_path,'frontend'))
    if status == 0:
        print 'built frontend successfully'
        # copy build folder over
        shutil.copytree(src_path, dest_path)
        print 'copied new build folder'
        return 0
    else:
        return 1

# create a symlink between /frontend/build and /build
def symlink_build_dir(self):
    current_path = os.path.dirname(os.path.realpath(__file__))
    src_path = os.path.join(current_path,'frontend','build')
    dest_path = os.path.join(current_path,'build')
    # delete the build folder and it's contents already exist
    if os.path.isdir(dest_path):
        shutil.rmtree(dest_path)
        print 'deleted build folder'
    os.symlink(src_path, dest_path)
    return 0


# if __name__ == "__main__":
#     app.run()
