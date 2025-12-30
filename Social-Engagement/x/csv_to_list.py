#!/usr/bin/env python3
"""
Convert X Exporter CSV to a simple list of handles.

Usage:
    python csv_to_list.py input.csv [output.txt]
    python csv_to_list.py input.csv --format handles|urls|json
"""

import csv
import sys
import json
from pathlib import Path


def read_x_exporter_csv(filepath):
    """Read X Exporter CSV and return list of user dicts."""
    users = []
    with open(filepath, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for row in reader:
            users.append({
                'screen_name': row.get('Screen Name', ''),
                'name': row.get('Name', ''),
                'followers': int(row.get('Followers Count', 0) or 0),
                'following': int(row.get('Friends Count', 0) or 0),
                'description': row.get('Description', ''),
                'location': row.get('Location', ''),
                'is_verified': row.get('Is Blue Verified', 'No') == 'Yes',
                'url': row.get('Profile Url', ''),
            })
    return users


def to_handles(users, with_at=True):
    """Return list of @handles, one per line."""
    prefix = '@' if with_at else ''
    return '\n'.join(f"{prefix}{u['screen_name']}" for u in users)


def to_urls(users):
    """Return list of profile URLs, one per line."""
    return '\n'.join(u['url'] for u in users if u['url'])


def to_json(users):
    """Return JSON array of user objects."""
    return json.dumps(users, indent=2, ensure_ascii=False)


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    input_file = Path(sys.argv[1])

    # Parse format flag
    output_format = 'handles'
    output_file = None

    for i, arg in enumerate(sys.argv[2:], start=2):
        if arg == '--format' and i + 1 < len(sys.argv):
            output_format = sys.argv[i + 1]
        elif not arg.startswith('--'):
            output_file = Path(arg)

    # Read CSV
    users = read_x_exporter_csv(input_file)
    print(f"Read {len(users)} users from {input_file.name}", file=sys.stderr)

    # Convert to output format
    if output_format == 'handles':
        output = to_handles(users)
    elif output_format == 'urls':
        output = to_urls(users)
    elif output_format == 'json':
        output = to_json(users)
    else:
        print(f"Unknown format: {output_format}", file=sys.stderr)
        sys.exit(1)

    # Write or print
    if output_file:
        output_file.write_text(output)
        print(f"Wrote to {output_file}", file=sys.stderr)
    else:
        print(output)


if __name__ == '__main__':
    main()
