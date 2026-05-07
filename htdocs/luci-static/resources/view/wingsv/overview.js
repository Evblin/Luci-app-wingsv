'use strict';
'require view';
'require form';
'require fs';
'require ui';
'require uci';

return view.extend({
	load: function() {
		return Promise.all([
			uci.load('wingsv'),
			fs.exec('/usr/bin/wingsv', [ 'status' ]).catch(function() {
				return { stdout: '{"running":false,"backend":"unknown","message":"status unavailable"}' };
			}),
			fs.exec('/usr/bin/wingsv', [ 'log', '80' ]).catch(function() {
				return { stdout: '' };
			})
		]);
	},

	render: function(data) {
		var status = {};
		var log = data[2].stdout || '';

		try {
			status = JSON.parse(data[1].stdout || '{}');
		}
		catch (e) {
			status = { running: false, backend: 'unknown', message: 'invalid status' };
		}

		var m = new form.Map('wingsv', _('WINGS V'), _('OpenWrt control panel for WINGS V style Xray, VK TURN, WireGuard, AmneziaWG and ByeDPI workflows.'));
		var s = m.section(form.NamedSection, 'main', 'wingsv', _('Service'));
		s.anonymous = true;

		var o = s.option(form.Flag, 'enabled', _('Enable service'));
		o.default = '0';

		o = s.option(form.ListValue, 'backend', _('Active backend'));
		o.value('xray', _('Xray'));
		o.value('vkturn', _('VK TURN'));
		o.value('wireguard', _('WireGuard'));
		o.value('amneziawg', _('AmneziaWG'));
		o.value('byedpi', _('ByeDPI only'));
		o.default = 'xray';

		o = s.option(form.Flag, 'auto_start', _('Start on boot'));
		o.default = '0';

		o = s.option(form.Value, 'log_lines', _('Log lines'));
		o.datatype = 'uinteger';
		o.default = '120';

		o = s.option(form.DummyValue, '_status', _('Current status'));
		o.rawhtml = true;
		o.cfgvalue = function() {
			var badge = status.running ? '<strong style="color:#15803d">running</strong>' : '<strong style="color:#b91c1c">stopped</strong>';
			return '%s<br />%s: %s<br />%s'.format(badge, _('Backend'), status.backend || '-', status.message || '');
		};

		o = s.option(form.Button, '_start', _('Start'));
		o.inputstyle = 'apply';
		o.onclick = function() {
			return fs.exec('/etc/init.d/wingsv', [ 'restart' ]).then(function() {
				ui.addNotification(null, E('p', _('WINGS V service restarted')));
				window.setTimeout(function() { location.reload(); }, 900);
			});
		};

		o = s.option(form.Button, '_stop', _('Stop'));
		o.inputstyle = 'reset';
		o.onclick = function() {
			return fs.exec('/etc/init.d/wingsv', [ 'stop' ]).then(function() {
				ui.addNotification(null, E('p', _('WINGS V service stopped')));
				window.setTimeout(function() { location.reload(); }, 900);
			});
		};

		var l = m.section(form.NamedSection, 'main', 'wingsv', _('Runtime log'));
		l.anonymous = true;
		o = l.option(form.DummyValue, '_log');
		o.rawhtml = true;
		o.cfgvalue = function() {
			return E('pre', { 'class': 'command-output', 'style': 'white-space:pre-wrap;max-height:360px;overflow:auto' }, [ log || _('No log output yet.') ]);
		};

		return m.render();
	}
});
