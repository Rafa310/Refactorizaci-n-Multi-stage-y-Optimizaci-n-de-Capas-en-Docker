<?php
return [
 'default' => env('DB_CONNECTION', 'mysql'),
 'connections' => [
  'mysql' => [
   'driver' => 'mysql',
   'host' => env('DB_HOST', 'db'),
   'port' => env('DB_PORT', '3306'),
   'database' => env('DB_DATABASE', 'tienda'),
   'username' => env('DB_USERNAME', 'tienda_user'),
   'password' => env('DB_PASSWORD', ''),
   'unix_socket' => env('DB_SOCKET', ''),
   'charset' => 'utf8mb4',
   'collation' => 'utf8mb4_unicode_ci',
   'prefix' => '',
   'prefix_indexes' => true,
   'strict' => true,
   'engine' => null,
  ],
 ],
 'migrations' => 'migrations',
];
