# -*- coding: utf-8 -*-
{
    'name': "Vehicle manage",

    'summary': """Vehicle monitoring system with simple registry""",

    'description': """
        Long description of module's purpose
    """,

    'author': "Igor Kuznetsov",
    'website': "https://www.swe-notes.ru",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/master/odoo/addons/base/module/module_data.xml
    # for the full list
    'category': 'Uncategorized',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base'],

    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        'views/views.xml',
        'demo/demo.xml',
    ],

    "external_dependencies": {
        'python': ['geojson']
    },
}