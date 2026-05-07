'use strict';
'require view';
'require form';

return view.extend({
	render: function() {
		var m = new form.Map('wingsv', _('VK TURN settings'));
		var s = m.section(form.NamedSection, 'vkturn', 'vkturn', _('Proxy'));
		s.anonymous = true;

		var o = s.option(form.Flag, 'enabled', _('Enable VK TURN'));
		o.default = '0';
		o = s.option(form.ListValue, 'runtime_mode', _('Runtime mode'));
		o.value('service', _('Service'));
		o.value('vpn', _('VPN compatibility'));
		o.default = 'service';
		o = s.option(form.Value, 'endpoint', _('Endpoint'));
		o.placeholder = 'host:port';
		o = s.option(form.Value, 'local_endpoint', _('Local endpoint'));
		o.default = '127.0.0.1:9000';
		o = s.option(form.Value, 'threads', _('Threads'));
		o.datatype = 'uinteger';
		o.default = '24';
		o = s.option(form.Value, 'creds_group_size', _('Credentials group size'));
		o.datatype = 'uinteger';
		o.default = '12';
		o = s.option(form.Flag, 'use_udp', _('Use UDP'));
		o.default = '1';
		o = s.option(form.Flag, 'no_obfuscation', _('No obfuscation'));
		o.default = '0';
		o = s.option(form.Flag, 'manual_captcha', _('Manual captcha'));
		o.default = '0';
		o = s.option(form.ListValue, 'captcha_auto_solver', _('Captcha auto solver'));
		o.value('off', _('Off'));
		o.value('v1', _('v1'));
		o.value('v2', _('v2'));
		o.default = 'v2';
		o = s.option(form.ListValue, 'session_mode', _('TURN session mode'));
		o.value('auto', _('Auto'));
		o.value('mainline', _('Mainline'));
		o.value('mux', _('Mux'));
		o.default = 'mainline';
		o = s.option(form.Value, 'turn_host', _('TURN host override'));
		o = s.option(form.Value, 'turn_port', _('TURN port override'));
		o.datatype = 'port';
		o = s.option(form.TextValue, 'link', _('VK TURN link'));
		o.rows = 4;
		o.monospace = true;

		return m.render();
	}
});
