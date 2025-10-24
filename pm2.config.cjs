module.exports = {
	apps: [
		{
			name: 'beancode-frontend-nextjs',
			script: 'npm',
			args: 'start',
			cwd: '/home/beancode/beancode-frontend-nextjs',
			env: {
				NODE_ENV: 'production',
				PORT: 3000,
			},
			instances: 1,
			exec_mode: 'fork',
			watch: false,
			max_memory_restart: '1G',
			error_file: './logs/err.log',
			out_file: './logs/out.log',
			log_file: './logs/combined.log',
			time: true,
		},
	],
};
