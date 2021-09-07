<?php

namespace App\Console\Commands;

use App\Jobs\ScanForNewFiles;
use Illuminate\Console\Command;

class ScanForNewFilesCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'music:scan';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Scans for new music.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('Scanning for new files...');
        $songs_added = ScanForNewFiles::dispatchSync();
        $this->info('Scanning for new files: finished.');
        $this->info(count($songs_added) . ' new songs were added to the library.');
    }
}
