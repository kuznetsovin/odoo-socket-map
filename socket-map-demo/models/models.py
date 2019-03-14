# -*- coding: utf-8 -*-

from odoo import models, fields


class Gps(models.Model):
    """
    Gps registry model
    """

    _name = 'vehicle.manage.gps'

    name = fields.Char("Code")


class Vehicle(models.Model):
    """
    Vehicle registry model
    """

    _name = 'vehicle.manage.vehicle'

    name = fields.Char("Vehicle number")
    gps_id = fields.Many2one("vehicle.manage.gps", "Gps")


class WebsocketConfig(models.Model):
    """
    Broker config model
    """

    _name = 'vehicle.manage.web.socket.config'

    name = fields.Char("Websocket server")
