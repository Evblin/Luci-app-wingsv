'use strict';
'require view';
'require form';

return view.extend({
	render: function() {
		var m = new form.Map('wingsv', _('ByeDPI settings'));
		var s = m.section(form.NamedSection, 'byedpi', 'byedpi', _('Integration'));
		s.anonymous = true;

		var o = s.option(form.Flag, 'enabled', _('Enable ByeDPI'));
		o.default = '0';
		o = s.option(form.Flag, 'auto_start_with_xray', _('Start with Xray'));
		o.default = '0';
		o = s.option(form.Flag, 'use_command_settings', _('Use command arguments'));
		o.default = '1';

		s = m.section(form.NamedSection, 'byedpi', 'byedpi', _('Proxy'));
		s.anonymous = true;
		o = s.option(form.Value, 'proxy_ip', _('Proxy IP'));
		o.datatype = 'ipaddr';
		o.default = '127.0.0.1';
		o = s.option(form.Value, 'proxy_port', _('Proxy port'));
		o.datatype = 'port';
		o.default = '1080';
		o = s.option(form.Flag, 'proxy_auth_enabled', _('Proxy auth'));
		o.default = '0';
		o = s.option(form.Value, 'proxy_username', _('Username'));
		o.depends('proxy_auth_enabled', '1');
		o = s.option(form.Value, 'proxy_password', _('Password'));
		o.password = true;
		o.depends('proxy_auth_enabled', '1');

		s = m.section(form.NamedSection, 'byedpi', 'byedpi', _('Desync editor'));
		s.anonymous = true;
		o = s.option(form.Value, 'max_connections', _('Max connections'));
		o.datatype = 'uinteger';
		o.default = '512';
		o = s.option(form.Value, 'buffer_size', _('Buffer size'));
		o.datatype = 'uinteger';
		o.default = '16384';
		o = s.option(form.Flag, 'tcp_fast_open', _('TCP Fast Open'));
		o.default = '0';
		o = s.option(form.ListValue, 'hosts_mode', _('Hosts mode'));
		o.value('disable', _('Disabled'));
		o.value('blacklist', _('Blacklist'));
		o.value('whitelist', _('Whitelist'));
		o.default = 'disable';
		o = s.option(form.DynamicList, 'hosts_blacklist', _('Hosts blacklist'));
		o.depends('hosts_mode', 'blacklist');
		o = s.option(form.DynamicList, 'hosts_whitelist', _('Hosts whitelist'));
		o.depends('hosts_mode', 'whitelist');
		o = s.option(form.Value, 'default_ttl', _('Default TTL'));
		o.datatype = 'uinteger';
		o.default = '0';
		o = s.option(form.ListValue, 'desync_method', _('Desync method'));
		o.value('oob', 'oob');
		o.value('disorder', 'disorder');
		o.value('split', 'split');
		o.value('fake', 'fake');
		o.default = 'oob';
		o = s.option(form.Value, 'split_position', _('Split position'));
		o.default = '1';
		o = s.option(form.Flag, 'split_at_host', _('Split at host'));
		o.default = '0';
		o = s.option(form.Flag, 'drop_sack', _('Drop SACK'));
		o.default = '0';
		o = s.option(form.Value, 'fake_ttl', _('Fake TTL'));
		o.default = '8';
		o = s.option(form.Value, 'fake_offset', _('Fake offset'));
		o.default = '0';
		o = s.option(form.Value, 'fake_sni', _('Fake SNI'));
		o.default = 'www.iana.org';
		o = s.option(form.Flag, 'desync_http', _('Desync HTTP'));
		o.default = '1';
		o = s.option(form.Flag, 'desync_https', _('Desync HTTPS'));
		o.default = '1';
		o = s.option(form.Flag, 'desync_udp', _('Desync UDP'));
		o.default = '1';
		o = s.option(form.Flag, 'tlsrec_enabled', _('TLS record split'));
		o.default = '1';
		o = s.option(form.Value, 'tlsrec_position', _('TLS record position'));
		o.default = '1';
		o = s.option(form.Flag, 'tlsrec_at_sni', _('TLS record at SNI'));
		o.default = '1';
		o = s.option(form.Value, 'udp_fake_count', _('UDP fake count'));
		o.default = '1';

		s = m.section(form.NamedSection, 'byedpi', 'byedpi', _('Command'));
		s.anonymous = true;
		o = s.option(form.TextValue, 'cmd_args', _('Command arguments'));
		o.rows = 6;
		o.monospace = true;

		return m.render();
	}
});
