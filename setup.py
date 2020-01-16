#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""The setup script."""

from setuptools import setup, find_packages

with open('README.md','rt', encoding='UTF8') as readme_file:
    readme = readme_file.read()

with open('HISTORY.md','rt', encoding='UTF8') as history_file:
    history = history_file.read()

requirements = [
    'pyserial>=3.1.1',
    'enum34>=1.1.6',
    ]

setup_requirements = [ ]

test_requirements = [ ]

setup(
    author="Jinsoo Heo",
    author_email='koriel@luxrobo.com',
    classifiers=[
        'Development Status :: 2 - Pre-Alpha',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Natural Language :: English',
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
        'Programming Language :: Python :: 3.6',
        'Programming Language :: Python :: 3.7',
    ],
    description="Easy😆 and fast💨 MODI Python API package.",
    long_description=readme + '\n\n' + history,
    long_description_content_type="text/markdown",
    install_requires=requirements,
    license="MIT license",
    include_package_data=True,
    keywords=(
        'pymodi', 'modi', 'luxrobo', 
    ),
    name='pymodi',
    packages=find_packages(include=['modi', 'modi.module']),
    setup_requires=setup_requirements,
    test_suite='tests',
    tests_require=test_requirements,
    url='https://github.com/LUXROBO/pyMODI',
    version='0.6.0',
    zip_safe=False,
)
