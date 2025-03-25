# windsurf-syncdocs

Extend Windsurf IDE with custom documentation by syncing docs from your installed packages.

## Background:

1. Windsurf has built-in documentation, but no ability to add custom documentation.
2. When you create custom packages, Windsurf can perform ++++ much better with access to structured documentation.
3. Usually, folders like `node_modules`, or similar are `.gitignore`'d by default, meaning we can't symlink documentation into Windsurf.

## The Fix:

Syncdocs provides a reproducible way to sync documentation from your installed packages into Windsurf.

You can then tell Windsurf to create a memory about how to sync docs, then Windsurf can later sync docs for you automatically, giving you access to the documentation you need.

## Installation

```bash
npm install windsurf-syncdocs
```

## Usage

1. Create a `.syncdocs.yaml` file in your project root with your sync configuration:

```yaml
syncs:
  - name: my-package-docs
    source: node_modules/my-package/docs
    target: docs/my-package
    # You don't need any of these options, but they are available if you need them.
    options:
      deleteOrphaned: true # Remove files in target that don't exist in source
      type: copy # 'copy' or 'hardlink'
      watch: false # Set to true for development mode
      logging:
        beforeSync: Starting docs sync...
        afterSync: Docs sync complete!
```

2. Run the sync command:

```bash
npm run syncdocs
```

## Configuration Options

Each sync configuration in `.syncdocs.yaml` supports:

- `name`: Identifier for this sync operation
- `source`: Path to source documentation (relative to project root)
- `target`: Path where docs should be synced (relative to project root)
- `options`:
  - `deleteOrphaned`: Remove files in target that don't exist in source (default: true)
  - `type`: 'copy' or 'hardlink' (default: 'copy')
  - `watch`: Watch for changes and sync automatically (default: false)
  - `logging`: Custom messages for sync operations
    - `beforeSync`: Message to show when sync starts
    - `afterSync`: Message to show when sync completes

## Example

To sync documentation from multiple packages:

```yaml
syncs:
  - name: ui-components
    source: node_modules/@my-org/ui-components/docs
    target: docs/ui-components
    options:
      deleteOrphaned: true
      watch: true

  - name: api-client
    source: node_modules/@my-org/api-client/docs
    target: docs/api-client
    options:
      deleteOrphaned: true
      type: hardlink
```

## Development Mode

Set `watch: true` in your sync options to automatically sync documentation when changes are detected in the source directory.

## License

MIT
